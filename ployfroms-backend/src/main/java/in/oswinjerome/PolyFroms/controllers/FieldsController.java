package in.oswinjerome.PolyFroms.controllers;

import in.oswinjerome.PolyFroms.models.Field;
import in.oswinjerome.PolyFroms.services.FieldsService;
import in.oswinjerome.PolyFroms.utils.ResponsePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class FieldsController {

    @Autowired
    FieldsService fieldsService;

    @PutMapping("/forms/{formId}/fields/{fieldId}")
    public ResponseEntity<ResponsePayload> updateField(@PathVariable String formId,
                                                       @PathVariable Long fieldId,
                                                       @RequestBody Field newField
    ) {
        return fieldsService.updateField(formId,fieldId,newField);
    }


    @PatchMapping("/forms/{formId}/fields/reorder")
    public ResponseEntity<ResponsePayload> reorder(@PathVariable String formId,
                                                       @RequestBody List<Field> fields
    ) {
        return fieldsService.reorder(formId,fields);
    }

    @DeleteMapping("/forms/{formId}/fields/{fieldId}")
    public ResponseEntity<ResponsePayload> deleteField(@PathVariable String formId,
                                                       @PathVariable Long fieldId
    ) {
        return fieldsService.deleteField(formId,fieldId);
    }

}

