package in.oswinjerome.PolyFroms.controllers;

import com.fasterxml.jackson.annotation.JsonView;
import in.oswinjerome.PolyFroms.dto.ResponseEntryWithFieldDTO;
import in.oswinjerome.PolyFroms.dto.SummaryDTO;
import in.oswinjerome.PolyFroms.dto.View;
import in.oswinjerome.PolyFroms.models.Field;
import in.oswinjerome.PolyFroms.models.Form;
import in.oswinjerome.PolyFroms.models.ResponseEntry;
import in.oswinjerome.PolyFroms.models.Submission;
import in.oswinjerome.PolyFroms.repos.FormsRepo;
import in.oswinjerome.PolyFroms.repos.ResponseEntryRepo;
import in.oswinjerome.PolyFroms.repos.SubmissionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TestController {

    @Autowired
    FormsRepo formsRepo;

    @Autowired
    ResponseEntryRepo responseEntryRepo;
    @Autowired
    private SubmissionRepo submissionRepo;

    @GetMapping("test")
    public Object getTest() {
        Form form = formsRepo.findById("6cb1c88b-d079-4362-b4e3-820f78d0a26c").orElseThrow();
        List<Field> fields =  form.getFields();
        List<SummaryDTO> summaryDTOS = new ArrayList<>();

        fields.forEach(field -> {
            SummaryDTO summaryDTO = new SummaryDTO();
            field.setResponseEntries(null);
            summaryDTO.setField(field);
            summaryDTO.setValues(responseEntryRepo.summary2(field));
            System.out.println(responseEntryRepo.summary2(field));
            summaryDTOS.add(summaryDTO);
        });

        return summaryDTOS;
    }
}
