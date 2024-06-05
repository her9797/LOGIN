package com.insider.login.commute.service;

import com.insider.login.commute.dto.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@SpringBootTest
public class CommuteServiceTests {

    @Autowired
    private CommuteService commuteService;

    private static Stream<Arguments> getStartWork() {
        return Stream.of(
                Arguments.of(
                        240501544,
                        LocalDate.now(),
//                        LocalDate.of(2024,04,29),
                        LocalTime.of(8,55),
                        "근무중",
                        0
                )
        );
    }

    @DisplayName("출근 시간 등록 테스트")
    @ParameterizedTest
    @MethodSource("getStartWork")
//    @Transactional
    void testInsertTimeOfCommute(int memberId, LocalDate workingDate, LocalTime startWork,
                                 String workingStatus, Integer totalWorkingHours) {
        //given
        CommuteDTO newCommute = new CommuteDTO(
                memberId,
                workingDate,
                startWork,
                workingStatus,
                totalWorkingHours
        );

        //when

        //then
        Assertions.assertDoesNotThrow(
                () -> commuteService.insertTimeOfCommute(newCommute)
        );
    }

    @DisplayName("퇴근 시간 등록 테스트")
    @Test
//    @Transactional
    void testUpdateTimeOfCommuteByCommuteNo() {
        //given
        int commuteNo = 19;
        LocalTime endWork = LocalTime.of(18,00);
        String workingStatus = "퇴근";

        /** 총 근무 시간 %%% 분 형식 (int)으로 만들기 */
        Duration workingDuration = Duration.between(LocalTime.of(8,55), endWork).minusHours(1);
        int totalWorkingHours = (int) workingDuration.toMinutes();

        UpdateTimeOfCommuteDTO updateTimeOfCommute = new UpdateTimeOfCommuteDTO(
                endWork,
                workingStatus,
                totalWorkingHours
        );

        //when
        Map<String, Object> result = commuteService.updateTimeOfCommuteByCommuteNo(commuteNo, updateTimeOfCommute);

        //then
        Assertions.assertTrue((Boolean) result.get("result"));
    }

    @DisplayName("부서별 출퇴근 내역 조회 테스트")
    @Test
//    @Transactional
    void testSelectCommuteListByDepartNo() {
        //given
        int departNo = 2;
        LocalDate date = LocalDate.now();

        /** 전체 출퇴근 내역 조회시 월간 조회에 사용할 변수들 */
        LocalDate startDayOfMonth = date.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endDayOfMonth = date.with(TemporalAdjusters.lastDayOfMonth());

        //when
        Map<String, Object> result = commuteService.selectCommuteListByDepartNo(departNo, startDayOfMonth, endDayOfMonth);

        //then
        Assertions.assertNotNull(result);
    }

    @DisplayName("멤버별 출퇴근 내역 조회 테스트")
    @Test
//    @Transactional
    void testSelectCommuteListByMemberId() {
        //given
        int memberId = 240501544;
        LocalDate date = LocalDate.now();

        /** 출퇴근 내역 조회시 주간 조회에 사용할 변수들 */
        LocalDate startWeek = date.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endWeek = date.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        //when
        List<CommuteDTO> commuteList = commuteService.selectCommuteListByMemberId(memberId, startWeek, endWeek);

        //then
        Assertions.assertNotNull(commuteList);
        commuteList.forEach(commute -> System.out.println("commute : " + commute));
    }

    private static Stream<Arguments> getCorrectTimeOfCommute() {
        return Stream.of(
                Arguments.of(
                        21
                        ,"07:55"
                        ,null
                        ,"시스템 에러로 인해 야근 시 퇴근시간에 오류가 있습니다."
                        ,LocalDate.now()
                        ,"대기"
                )
        );
    }
    @DisplayName("출퇴근 시간 정정 등록 테스트")
    @ParameterizedTest
    @MethodSource("getCorrectTimeOfCommute")
    void testInsertRequestForCorrect(int commuteNo, String reqStartWork, String reqEndWork,
                                     String reasonForCorr, LocalDate corrRegistrationDate, String corrStatus) {
        //given
        CorrectionDTO newCorrection = new CorrectionDTO(
                commuteNo,
                reqStartWork,
                reqEndWork,
                reasonForCorr,
                corrRegistrationDate,
                corrStatus
        );

        //when

        //then
        Assertions.assertDoesNotThrow(
                () -> commuteService.insertRequestForCorrect(newCorrection));
    }

    @DisplayName("출퇴근 시간 정정 등록 테스트")
    @Test
    void testInsertNewCorrect() {
        //given
        int memberId = 240401835;
        LocalDate workingDate = LocalDate.now();
        String reqStartWork = "09:00";
        String reqEndWork = "18:00";
        LocalDate corrRegistrationDate = LocalDate.now();
        String reasonForCorr = "실수로 출퇴근 시간을 입력하지 못하였습니다.";
        String corrStatus = "대기";

        NewCorrectionDTO newCorrection = new NewCorrectionDTO(
                memberId,
                workingDate,
                reqStartWork,
                reqEndWork,
                corrRegistrationDate,
                corrStatus,
                reasonForCorr
        );

        //when

        //then
        Assertions.assertDoesNotThrow(
                () -> commuteService.insertNewCorrect(newCorrection));
    }

    @DisplayName("출퇴근 시간 정정 처리 테스트")
    @Test
    void testUpdateProcessForCorrectByCorrNo() {
        //given
        /** case 1. 정정 처리 - 승인 */
//        int corrNo = 122;
//        String corrStatus = "승인";
//        LocalDate corrProcessingDate = LocalDate.now();
//
//        UpdateProcessForCorrectionDTO updateProcessForCorrection = new UpdateProcessForCorrectionDTO(
//                corrStatus,
//                corrProcessingDate
//        );

        /** case 2. 정정 처리 - 반려 */
        int corrNo = 126;
        String corrStatus = "반려";
        String reasonForRejection = "적절한 정정 사유에 해당하지 않습니다.";
        LocalDate corrProcessingDate = LocalDate.now();

        UpdateProcessForCorrectionDTO updateProcessForCorrection = new UpdateProcessForCorrectionDTO(
                corrStatus,
                reasonForRejection,
                corrProcessingDate
        );

        //when
        Map<String, Object> result = commuteService.updateProcessForCorrectByCorrNo(corrNo, updateProcessForCorrection);

        //then
        Assertions.assertTrue((Boolean) result.get("result"));
    }

    @DisplayName("전체 출퇴근 시간 정정 내역 조회 테스트")
    @Test
    void testSelectRequestForCorrectList() {
        //given
        LocalDate date = LocalDate.now();
        LocalDate startDayOfMonth = date.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endDayOfMonth = date.with(TemporalAdjusters.lastDayOfMonth());
        Pageable pageable = Pageable.ofSize(10);

        //when
        Map<String, Object> result = commuteService.selectRequestForCorrectList(startDayOfMonth, endDayOfMonth, pageable);

        //then
        Assertions.assertTrue(!result.isEmpty());
    }

    @DisplayName("멤버별 출퇴근 시간 정정 내역 조회 테스트")
    @Test
    void testSelectRequestForCorrectByMemberId() {
        //given
        int memberId = 240401835;
        LocalDate date = LocalDate.now();
        LocalDate startDayOfMonth = date.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endDayOfMonth = date.with(TemporalAdjusters.lastDayOfMonth());
        Pageable pageable = Pageable.ofSize(10);

        //when
        Map<String, Object> result = commuteService.selectRequestForCorrectListByMemberId(memberId, startDayOfMonth, endDayOfMonth, pageable);

        //then
        Assertions.assertTrue(!result.isEmpty());
    }

    @DisplayName("출퇴근 시간 정정 요청 상세 조회 테스트")
    @Test
    void testSelectRequestForCorrectByCorrNo() {
        //given
        int corrNo = 113;

        //when
        CorrectionDTO correction = commuteService.selectRequestForCorrectByCorrNo(corrNo);

        //then
        Assertions.assertNotNull(correction);
        System.out.println("correction : " + correction);
    }

    @DisplayName("출퇴근 내역 상세 조회 테스트")
    @Test
    void testSelectCommuteDetailByCommuteNo() {
        //given
        int commuteNo = 1;

        //when
        CommuteDTO commute = commuteService.selectCommuteDetailByCommuteNo(commuteNo);

        //then
        Assertions.assertEquals(commuteNo, commute.getCommuteNo());
        System.out.println("commute : " + commute);
    }

}
