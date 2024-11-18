package in.oswinjerome.PolyFroms.controllers;


import in.oswinjerome.PolyFroms.dto.FieldStateDto;
import in.oswinjerome.PolyFroms.services.FormService;
import in.oswinjerome.PolyFroms.utils.ResponsePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public")
public class PublicController {

    @Autowired
    FormService formService;

    @GetMapping("/forms/{formId}")
    public ResponseEntity<ResponsePayload> getAForm(@PathVariable String formId) {
        return formService.getForm(formId);
    }

    @PostMapping("/forms/{formId}")
    public ResponseEntity<ResponsePayload> processSubmission(@PathVariable String formId,
                                                             @RequestBody List<FieldStateDto> fields) {
        return formService.processSubmission(formId,fields);
    }


}
