package in.oswinjerome.PolyFroms.services;

import in.oswinjerome.PolyFroms.dto.FieldStateDto;
import in.oswinjerome.PolyFroms.dto.ResponseEntryWithFieldDTO;
import in.oswinjerome.PolyFroms.dto.SubmissionDTO;
import in.oswinjerome.PolyFroms.dto.SummaryDTO;
import in.oswinjerome.PolyFroms.enums.FieldType;
import in.oswinjerome.PolyFroms.models.*;
import in.oswinjerome.PolyFroms.repos.FieldRepo;
import in.oswinjerome.PolyFroms.repos.FormsRepo;
import in.oswinjerome.PolyFroms.repos.ResponseEntryRepo;
import in.oswinjerome.PolyFroms.repos.SubmissionRepo;
import in.oswinjerome.PolyFroms.utils.ResponsePayload;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FormService {

    @Autowired
    AuthService authService;

    @Autowired
    FormsRepo formsRepo;
    @Autowired
    private FieldRepo fieldRepo;

    @Autowired
    private SubmissionRepo submissionRepo;

    @Autowired
    private ResponseEntryRepo responseEntryRepo;

    @Transactional
    public ResponseEntity<ResponsePayload> create(Form form) {

        formsRepo.save(form);


        return new ResponseEntity<>(new ResponsePayload(
                true,
                form,
                ""
        ), HttpStatus.CREATED);
    }

    public ResponseEntity<ResponsePayload> getForms() {

        User currentUser = authService.getCurrentUser();
//        Try user.forms()
        List<Form> forms = formsRepo.findFormsByUser(currentUser);


        return new ResponseEntity<>(new ResponsePayload(
                true,
                forms,
                ""
        ), HttpStatus.OK);
    }

    public ResponseEntity<ResponsePayload> getForm(String formId) {

        Form form = formsRepo.findById(formId).orElseThrow(()-> new EntityNotFoundException("Form not found"));
        List<Field> fields = fieldRepo.findFieldsByFormOrderByOrderNo(form);
        form.setFields(fields);
        if(authService.isAuthenticated()){
            form.setLastOpenedAt(LocalDateTime.now());
            formsRepo.save(form);
        }
        return new ResponseEntity<>(new ResponsePayload(
                true,
                form,
                ""
        ), HttpStatus.OK);
    }

    public ResponseEntity<ResponsePayload> createField(String formId, Field field) {
        Form form = formsRepo.findById(formId).orElseThrow(()-> new EntityNotFoundException("Form not found"));
        field.setOrderNo(form.getFields().size()+1);
        field.setForm(form);
        fieldRepo.save(field);
        return new ResponseEntity<>(new ResponsePayload(
                true,
                field,
                ""
        ), HttpStatus.OK);
    }

    public ResponseEntity<ResponsePayload> updateForm(String formId, Form toUpdate) {
        Form form = formsRepo.findById(formId).orElseThrow(()-> new EntityNotFoundException("Form not found"));
        System.out.println(toUpdate);
       if(toUpdate.getTitle() != null){
           form.setTitle(toUpdate.getTitle());
       }
       if(toUpdate.getDescription() != null){
           form.setDescription(toUpdate.getDescription());
       }

        if(toUpdate.getAllowResponse() != null){
            form.setAllowResponse(toUpdate.getAllowResponse());
        }
        if(toUpdate.getResponseLimit() != null){
            form.setResponseLimit(toUpdate.getResponseLimit());
        }


        formsRepo.save(form);

        return new ResponseEntity<>(new ResponsePayload(
                true,
                form,
                ""
        ), HttpStatus.OK);
    }

    public ResponseEntity<ResponsePayload> processSubmission(String formId, List<FieldStateDto> fields) {

        Form form = formsRepo.findById(formId).orElseThrow(()-> new EntityNotFoundException("Form not found"));

        Submission submission = new Submission();
        submission.setForm(form);
        submissionRepo.save(submission);

        for (FieldStateDto fieldStateDto : fields) {
            System.out.println(fieldStateDto);
            ResponseEntry entry = new ResponseEntry();
            entry.setValue(fieldStateDto.getValue());
            entry.setValues(fieldStateDto.getValues());
            entry.setSubmission(submission);
           Field field=  fieldRepo.findById(fieldStateDto.getId()).orElse(null);
           if(field != null){
               entry.setField(field);
           }
           responseEntryRepo.save(entry);
        }

        return new ResponseEntity<>(new ResponsePayload(
                true,
                submission,
                ""
        ), HttpStatus.OK);
    }

    public ResponseEntity<ResponsePayload> getResponseQuestions(String formId) {
        Form form = formsRepo.findById(formId).orElseThrow();
        List<Field> fields = form.getFields();
        for (Field field : fields) {

            field.setResponseEntries(
                    field.getResponseEntries()
            );
        }

        return new ResponseEntity<>(new ResponsePayload(
                true,
                fields,
                ""
        ), HttpStatus.OK);
    }

    public ResponseEntity<ResponsePayload> getResponseSingle(String formId, Pageable pageable) {
        Form form = formsRepo.findById(formId).orElseThrow();
        Page<Submission> page =  submissionRepo.findAllByForm(form,pageable);
        List<Submission> submissions = page.getContent();

        List<SubmissionDTO> ss = submissions.stream().map((s)->{
            return new SubmissionDTO(s.getId(),s.getSubmittedAt(),null,s.getResponseEntries().stream().map(
                    x-> new ResponseEntryWithFieldDTO(x.getId(),x.getValue(),x.getValues(),x.getField())
            ).toList());
        }).toList();
        return new ResponseEntity<>(
                new ResponsePayload(
                        true,
                        new PageImpl<>(ss,pageable,page.getTotalElements()),""
                ), HttpStatus.OK
        );
    }

    public ResponseEntity<ResponsePayload> getSummary(String formId) {
        Form form = formsRepo.findById(formId).orElseThrow();
        List<Field> fields =  form.getFields();
        List<SummaryDTO> summaryDTOS = new ArrayList<>();

        fields.forEach(field -> {
            SummaryDTO summaryDTO = new SummaryDTO();
            field.setResponseEntries(null);
            summaryDTO.setField(field);
            if(field.getFieldType() == FieldType.MULTI_CHOICE){

                String formattedArray = "{" + String.join(",", field.getOptions()) + "}";  // '{apple,banana,orange}'

                summaryDTO.setValues(responseEntryRepo.summary3(field.getId(),formattedArray));
            }else{
                summaryDTO.setValues(responseEntryRepo.summary2(field));
            }
            summaryDTOS.add(summaryDTO);
        });


        return new ResponseEntity<>(new ResponsePayload(
                true,
                summaryDTOS,
                ""
        ),HttpStatus.OK);
    }
}
