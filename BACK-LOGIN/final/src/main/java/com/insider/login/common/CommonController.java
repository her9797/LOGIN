package com.insider.login.common;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CommonController {

    /** 페이징 관련 DATA 가져오는 메서드 */
    public static Pageable getPageable(int page, int size, String sort, String direction) {
        Sort pageableSort;
        if ("ancNo".equals(sort) || "noteNo".equals(sort) || "proposalId".equals(sort)) {
            Sort.Direction sortDirection;
            try {
                sortDirection = Sort.Direction.fromString(direction);
            } catch (IllegalArgumentException e) {
                // direction 값이 잘못된 경우 기본값인 DESC로 설정
                sortDirection = Sort.Direction.DESC;
            }

            switch (sort) {
                case "noteNo":
                    pageableSort = Sort.by(sortDirection, "noteNo");
                    break;
                case "proposalId":
                    pageableSort = Sort.by(sortDirection, "proposalId");
                    break;
                default: // "ancNo"인 경우
                    pageableSort = Sort.by(sortDirection, "ancNo");
                    break;
            }
        } else {
            pageableSort = Sort.unsorted();
        }
        return PageRequest.of(page, size, pageableSort);
    }


    /** 현재 시간 가져오는 메서드 */
    public static String nowDate () {

        Date now = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        String nowDate = sdf.format(now);

        return nowDate;
    }

}
