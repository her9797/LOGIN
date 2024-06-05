package com.insider.login.leave.util;

import com.insider.login.leave.dto.LeaveInfoDTO;
import com.insider.login.leave.entity.LeaveSubmit;
import com.insider.login.leave.entity.Leaves;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

public class LeaveUtil {

    public int leaveDaysCalc(LeaveSubmit leaveSubmit) {
        LocalDate startDate = leaveSubmit.getLeaveSubStartDate();
        LocalDate endDate = leaveSubmit.getLeaveSubEndDate();

        // 두 날짜 사이의 일수 계산
        return (int) (ChronoUnit.DAYS.between(startDate, endDate) + 1);
    }

    public LeaveInfoDTO leaveInfoCalc(List<Leaves> memberLeaves) {
        int memberId = memberLeaves.get(0).getMemberId();
        int annualLeave = 0;        // 연차
        int specialLeave = 0;       // 특별휴가

        // 해당 사번을 키로 가진 휴가 리스트를 for문을 통해 유형별 총 일수를 구함
        for (Leaves leaves : memberLeaves) {
            if ("연차".equals(leaves.getLeaveType())) {
                annualLeave += leaves.getLeaveDays();
            } else {
                specialLeave += leaves.getLeaveDays();
            }
        }

        // 총 부여 일수
        int totalDays = annualLeave + specialLeave;

        return new LeaveInfoDTO(memberId, annualLeave, specialLeave, totalDays);
    }
}
