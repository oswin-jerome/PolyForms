package in.oswinjerome.PolyFroms.services;

import in.oswinjerome.PolyFroms.exceptions.RestrictedAccessException;
import in.oswinjerome.PolyFroms.models.Field;
import in.oswinjerome.PolyFroms.models.Form;
import in.oswinjerome.PolyFroms.models.User;
import in.oswinjerome.PolyFroms.repos.FieldRepo;
import in.oswinjerome.PolyFroms.repos.FormsRepo;
import in.oswinjerome.PolyFroms.utils.ResponsePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FieldsService {

    @Autowired
    FormsRepo formsRepo;

    @Autowired
    FieldRepo fieldRepo;

    @Autowired
    AuthService authService;

    public ResponseEntity<ResponsePayload> updateField(String formId, Long fieldId, Field newField) {

        Form form = formsRepo.findById(formId).orElseThrow();
        User user = authService.getCurrentUser();
        if(user.equals(form.getUser())){
            throw new RestrictedAccessException("You are trying to access a form that is not yours");
        }

        Field f = fieldRepo.findById(fieldId).orElseThrow();

        if(!f.getForm().equals(form)){
            throw new RestrictedAccessException("Foreign field");
        }

        f.setFieldType(newField.getFieldType());
        f.setOptions(newField.getOptions());
        f.setTitle(newField.getTitle());
        f.setRequired(newField.getRequired());

        fieldRepo.save(f);

        return new ResponseEntity<>(new ResponsePayload(true,f,""), HttpStatus.OK);

    }

    public ResponseEntity<ResponsePayload> reorder(String formId, List<Field> modifiedFields) {
//        TODO: security

        Form form = formsRepo.findById(formId).orElseThrow();
        List<Field> fields = fieldRepo.findFieldsByFormOrderByOrderNo(form);

        for (int i = 0; i < fields.size(); i++) {
            fields.get(i).setOrderNo(modifiedFields.get(i).getOrderNo());
        }
        fieldRepo.saveAll(fields);
        return new ResponseEntity<>(new ResponsePayload(true,fields,""), HttpStatus.OK);


    }

    public ResponseEntity<ResponsePayload> deleteField(String formId, Long fieldId) {
        Form form = formsRepo.findById(formId).orElseThrow();
        User user = authService.getCurrentUser();
        if(user.equals(form.getUser())){
            throw new RestrictedAccessException("You are trying to access a form that is not yours");
        }

        Field f = fieldRepo.findById(fieldId).orElseThrow();

        if(!f.getForm().equals(form)){
            throw new RestrictedAccessException("Foreign field");
        }

        fieldRepo.delete(f);

        return new ResponseEntity<>(new ResponsePayload(true,"Deleted",""), HttpStatus.OK);

    }
}
