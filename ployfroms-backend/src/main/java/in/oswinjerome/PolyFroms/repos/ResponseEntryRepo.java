package in.oswinjerome.PolyFroms.repos;

import in.oswinjerome.PolyFroms.models.Field;
import in.oswinjerome.PolyFroms.models.Form;
import in.oswinjerome.PolyFroms.models.ResponseEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface ResponseEntryRepo extends JpaRepository<ResponseEntry,String> {

    @Query("SELECT COUNT(*) FROM  ResponseEntry re GROUP BY re.value")
    Object getAllResponses(Field field);

    @Query("SELECT re.value as value,re.field as field,COUNT(*) as count FROM ResponseEntry re WHERE re.field.form=:form GROUP BY re.field, re.value")
    List<Map<String,Object>> summary(Form form);

    @Query("SELECT re.value as value,COUNT(*) as count FROM ResponseEntry re WHERE re.field=:field GROUP BY re.value")
    List<Map<String,Object>> summary2(Field field);

    @Query(
            value = """
             WITH possible_values AS (
                SELECT unnest(CAST(:ids AS text[])) AS value) SELECT
                pv.value,
                COUNT(*) AS count
            FROM
                possible_values pv
            JOIN LATERAL (
                SELECT json_array_elements_text(r.values) AS elem
                FROM public.response_entry r WHERE r.field_id = :field
            ) AS json_elements
            ON replace(json_elements.elem,' ','') = replace(pv.value,' ','')
            GROUP BY pv.value
            ORDER BY count DESC;
""", nativeQuery = true
    )
    List<Map<String,Object>> summary3(@Param("field")  Long field, @Param("ids") String ids);
}
