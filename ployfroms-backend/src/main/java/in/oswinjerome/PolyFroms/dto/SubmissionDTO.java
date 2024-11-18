package in.oswinjerome.PolyFroms.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import in.oswinjerome.PolyFroms.models.Form;
import in.oswinjerome.PolyFroms.models.ResponseEntry;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class SubmissionDTO {
    private String id;

    private LocalDateTime submittedAt = LocalDateTime.now();

    private Form form;

    private List<ResponseEntryWithFieldDTO> responseEntries;
}
