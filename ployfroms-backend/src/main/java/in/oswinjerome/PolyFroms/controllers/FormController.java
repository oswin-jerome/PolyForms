package in.oswinjerome.PolyFroms.controllers;

import in.oswinjerome.PolyFroms.enums.FieldType;
import in.oswinjerome.PolyFroms.models.Field;
import in.oswinjerome.PolyFroms.models.Form;
import in.oswinjerome.PolyFroms.repos.FieldRepo;
import in.oswinjerome.PolyFroms.repos.FormsRepo;
import in.oswinjerome.PolyFroms.services.AuthService;
import in.oswinjerome.PolyFroms.services.FormService;
import in.oswinjerome.PolyFroms.utils.ResponsePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/forms")
public class FormController {

    @Autowired
    FormService formService;

    @Autowired
    AuthService authService;


    @PostMapping
    public ResponseEntity<ResponsePayload> createForm(@RequestBody Form form) {

        form.setUser(authService.getCurrentUser());

        return formService.create(form);

    }

    @GetMapping
    public ResponseEntity<ResponsePayload> getForms() {
        return formService.getForms();
    }

    @GetMapping("/{formId}")
    public ResponseEntity<ResponsePayload> getForm( @PathVariable String formId) {
        return formService.getForm(formId);
    }

    @PatchMapping("/{formId}")
    public ResponseEntity<ResponsePayload> updateForm( @PathVariable String formId, @RequestBody Form form) {
        return formService.updateForm(formId,form);
    }

    @PostMapping("/{formId}/fields")
    public ResponseEntity<ResponsePayload> createField( @PathVariable String formId,
                                                        @RequestBody Field field
    ) {
        return formService.createField(formId,field);
    }


    @GetMapping("/{formId}/response/questions")
    public ResponseEntity<ResponsePayload> getResponseQuestions( @PathVariable String formId) {
        return formService.getResponseQuestions(formId);
    }

    @GetMapping("/{formId}/response/single")
    public ResponseEntity<ResponsePayload> getResponseSingle(@PathVariable String formId, Pageable pageable) {
        return formService.getResponseSingle(formId,pageable);
    }


    @GetMapping("/{formId}/response/summary")
    public ResponseEntity<ResponsePayload> getSummary(@PathVariable String formId) {
        return formService.getSummary(formId);
    }


}
