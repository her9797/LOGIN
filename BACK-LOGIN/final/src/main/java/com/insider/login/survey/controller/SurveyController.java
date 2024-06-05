package com.insider.login.survey.controller;

import com.insider.login.common.CommonController;
import com.insider.login.common.ResponseMessage;
import com.insider.login.survey.dto.SurveyDTO;
import com.insider.login.survey.dto.SurveyInsertRequestDTO;
import com.insider.login.survey.dto.SurveyResponseDTO;
import com.insider.login.survey.service.SurveyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
public class SurveyController extends CommonController {

    private final SurveyService surveyService;

    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    /**
     * 수요조사 목록 전체 조회
     */
    @GetMapping("/surveys")
    public ResponseEntity<ResponseMessage> selectSurveyList(@RequestParam(value = "page", defaultValue = "0") int pageNumber,
                                                            @RequestParam(value = "direction", defaultValue = "DESC") String direction,
                                                            @RequestParam(value = "properties", defaultValue = "surveyNo") String properties,
                                                            @RequestParam("memberId") int memberId) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        Pageable pageable;

        if (!direction.equals("DESC")) {
            pageable = PageRequest.of(pageNumber, 10, Sort.by(Sort.Direction.ASC, properties));
        } else {
            pageable = PageRequest.of(pageNumber, 10, Sort.by(Sort.Direction.DESC, properties));
        }

        Page<SurveyDTO> page = surveyService.selectSurveyList(pageable, memberId);

        if (page.isEmpty()) {
            String errorMessage = "등록된 수요조사 항목이 없습니다.";
            ResponseMessage responseMessage = new ResponseMessage(HttpStatus.NOT_FOUND.value(), errorMessage, null);
            return new ResponseEntity<>(responseMessage, headers, HttpStatus.NOT_FOUND);
        }

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("page", page);

        ResponseMessage responseMessage = new ResponseMessage(200, "조회 성공", responseMap);

        return new ResponseEntity<>(responseMessage, headers, HttpStatus.OK);
    }

    /**
     * 수요조사 상세 조회
     */
    @GetMapping("/surveys/{surveyNo}")
    public ResponseEntity<ResponseMessage> selectSurveyBySurveyNo(@PathVariable("surveyNo") int surveyNo) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        SurveyDTO survey = surveyService.selectSurveyBySuveyNo(surveyNo);

        if (survey == null) {
            String errorMessage = "처리 과정에서 문제가 발생했습니다. 다시 시도해주세요";
            ResponseMessage responseMessage = new ResponseMessage(HttpStatus.NOT_FOUND.value(), errorMessage, null);
            return new ResponseEntity<>(responseMessage, headers, HttpStatus.NOT_FOUND);
        }

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("survey", survey);

        ResponseMessage responseMessage = new ResponseMessage(200, "조회 성공", responseMap);

        return new ResponseEntity<>(responseMessage, headers, HttpStatus.OK);
    }

    /**
     * 수요조사 등록
     */
    @PostMapping("/surveys")
    public ResponseEntity<String> insertSurvey(@RequestBody SurveyInsertRequestDTO request) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        request.getSurveyDTO().setSurveyApplyDate(nowDate());

        return ResponseEntity.ok().headers(headers).body(surveyService.insertSurvey(request.getSurveyDTO(), request.getAnswers()));
    }

    /**
     * 수요조사 삭제
     */
    @DeleteMapping("/surveys/{surveyNo}")
    public ResponseEntity<String> deleteSurvey(@PathVariable("surveyNo") int surveyNo) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        return ResponseEntity.ok().headers(headers).body(surveyService.deleteSurvey(surveyNo));
    }


    /**
     * 수요조사 응답 등록
     */
    @PostMapping("/surveyResponses")
    public ResponseEntity<String> insertResponse(@RequestBody SurveyResponseDTO responseDTO) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        return ResponseEntity.ok().headers(headers).body(surveyService.insertResponse(responseDTO));
    }
}
