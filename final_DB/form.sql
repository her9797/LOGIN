INSERT INTO insider.form (form_no, form_name, form_shape) VALUES ('abs', '휴직신청서', '<div name="wholeForm"id="wholeForm" class="wholeForm">
      
          <table>
              <tr >
                  <th>휴직 시작일자</th>
            <td><div></div></td>
          </tr>
          <tr >
                <th>휴직 종료일자</th>
          <td><div></div></td>
              </tr>
      <tr >
                <th>복직 예정일자</th>
          <td><div></div></td>
              </tr>
        <tr name="abs_reason" id="abs_reason">
                <th>휴직사유</th>
          <td><div></div></td>
              </tr>
        <tr name="orders" id="orders">
                <th>기타사항</th>
          <td><div></div></td>
              </tr>
        <tr >
                <th>연락처</th>
          <td><div></div></td>
              </tr>
         </table>
       </div>
      <div name="date" id="date" class="date">
      <div></div>
      </div>');
INSERT INTO insider.form (form_no, form_name, form_shape) VALUES ('con', '경조금 지급 신청서', '<div name="wholeForm" id="wholeForm" class="wholeForm">
        
        <table>
            <tr>
                <th>경조사항</th>
                <td><div></div></td>
            </tr>
            <tr>
                <th>본인과의 관계</th>
                <td><div></div></td>
            </tr>
            <tr>
                <th>발생일자</th>
                <td><div></div></td>
            </tr>
            <tr>
                <th>장소</th>
                <td><div></div></td>
            </tr>
            <tr>
                <th>휴가기간</th>
                <td><div></div></td>
            </tr>
        </table>
    </div>
    <div name="date" id="date" class="date">
        <div></div>
    </div>');
INSERT INTO insider.form (form_no, form_name, form_shape) VALUES ('exp', '지출결의서', '<div name="wholeForm"id="wholeForm" class="wholeForm">
    
        <table name="sideTable" id="sideTable">
          <tr>
            <th>금액</th>
            <td><div></div></td>
          </tr>
          <tr>
            <th>지출사유</th>
            <td><div></div></td>
          </tr>
        </table>
        <table>
            <tr >
                <th>일자</th>
                <th>분류</th>
                <th name="useDetail" id="useDetail">사용내역</th>
                <th name="usePrice" id="usePrice">금액</th>
                <th>비고</th>
              </tr>
              <tr >
                <td name="exp_date" class="exp_date"></td>
                <td><div></div></td>
                <td><div></div></td>
                <td><div></div></td>
                <td><div></div></td>
              </tr>
              <tr >
                <td name="exp_date" class="exp_date"></td>
                <td><div></div></td>
                <td><div></div></td>
                <td><div></div></td>
                <td><div></div></td>
                        </tr>
            <tr>
                <td  name="exp_date" class="exp_date"></td>
                <td><div></div></td>
                <td><div></div></td>
                <td><div></div></td>
                <td><div></div></td>
            </tr>
            <tr>
                <td  name="exp_date" class="exp_date"></td>
                <td><div></div></td>
                <td><div></div></td>
                <td><div></div></td>
                <td><div></div></td>
                    </tr>
            <tr>
              <th colspan="3">
                합계
              </th>
              <td><div></div></td>
            </tr>
            
           </table>
         </div>
      <div name="date" id="date" class="date">
        <div></div>
       </div>');
INSERT INTO insider.form (form_no, form_name, form_shape) VALUES ('non', '기본', '<div name="wholeForm" id="wholeForm" class="wholeForm">
        <table>
            <td class="nonContent">
                <div></div>
            </td>
        </table>
        <div name="date" id="date" class="date">
            <div></div>
        </div>
    </div>');
INSERT INTO insider.form (form_no, form_name, form_shape) VALUES ('ovt', '연장근무신청서', '<div name="wholeForm" id="wholeForm" class="wholeForm">

        <table name="ovt_table" id="ovt_table">
            <tr>
                <th rowspan="2">근무시간</th>
                <th>근무일자</th>
                <th>시간</th>
                <th>총 연장근무 시간</th>
            </tr>
            <tr>
                <td><div></div></td>
                <td><div></div></td>
                <td><div></div></td>
            </tr>

            <tr name="ovt_reason" id="ovt_reason">
                <th>근무사유</th>
                <td colspan="3"><div></div></td>
            </tr>
            <tr name="ovt_special" id="ovt_special">
                <th>특이사항</th>
                <td colspan="3"><div></div></td>
            </tr>
            <tr>
                <td colspan="4" name="ovt_warning" id="ovt_warning">
                    ※ 연장근무(휴일 포함)는 주 12시간을 초과할 수 없습니다.
                </td>
            </tr>
        </table>
    </div>
    <div name="date" id="date" class="date">
        <div></div>
    </div>');
INSERT INTO insider.form (form_no, form_name, form_shape) VALUES ('rei', '복직신청서', '<div name="wholeForm" id="wholeForm" class="wholeForm">

        <table>
            <tr name="rei_content" id="rei_content">
                <td colspan="2"><div></div></td>
            </tr>
            <tr>
                <th>휴직 시작일자</th>
                <td><div></div></td>
            </tr>
            <tr>
                <th>휴직 종료일자</th>
                <td><div></div></td>
            </tr>
            <tr>
                <th>복직일자</th>
                <td><div></div></td>
            </tr>
            <tr name="abs_reason" id="abs_reason">
                <th>복직사유</th>
                <td><div></div></td>
            </tr>
        </table>
    </div>
    <div name="date" id="date" class="date">
        <div></div>
    </div>');
INSERT INTO insider.form (form_no, form_name, form_shape) VALUES ('sup', '비품신청서', '<div name="wholeForm" id="wholeForm" class="wholeForm">
        <table name="sup_table" id="sup_table">
            <tr name="sup_header" id="sup_header">
                <th rowspan="2">품명</th>
                <th rowspan="2">규격</th>
                <th rowspan="2">수량</th>
                <th name="purchasePrice" class="purchasePrice" colspan="2">구매예정가격</th>
                <th rowspan="2">용도</th>
            </tr>
            <tr name="purchasePricetr" id="purchasePricetr">
                <th name="purchasePrice" class="purchasePrice">단가</th>
                <th name="purchasePrice" class="purchasePrice">금액</th>
            </tr>
            <tr>
                <td class="sup_itemname"><div></div></td>
                <td><div></div></td>
                <td class="sup_itemAmount"><div></div></td>
                <td class="sup_price"><div></div></td>
                <td class="sup_price"><div></div></td>
                <td><div></div></td>
            </tr>
            <tr>
                <td class="sup_itemname"><div></div></td>
                <td><div></div></td>
                <td class="sup_itemAmount"><div></div></td>
                <td class="sup_price"><div></div></td>
                <td class="sup_price"><div></div></td>
                <td><div></div></td>
            </tr>
            <tr>
                <td class="sup_itemname"><div></div></td>
                <td><div></div></td>
                <td class="sup_itemAmount"><div></div></td>
                <td class="sup_price"><div></div></td>
                <td class="sup_price"><div></div></td>
                <td><div></div></td>
            </tr>
            <tr>
                <td class="sup_itemname"><div></div></td>
                <td><div></div></td>
                <td class="sup_itemAmount"><div></div></td>
                <td class="sup_price"><div></div></td>
                <td class="sup_price"><div></div></td>
                <td><div></div></td>
            </tr>
            <tr>
                <td class="sup_itemname"><div></div></td>
                <td><div></div></td>
                <td class="sup_itemAmount"><div></div></td>
                <td class="sup_price"><div></div></td>
                <td class="sup_price"><div></div></td>
                <td><div></div></td>
            </tr>
            <tr>
                <th colspan="3" name="">합계</th>
                <td colspan="3" class="sup_price"><div></div></td>
            </tr>

        </table>
    </div>
    <div name="date" id="date" class="date"> 
        <div></div>
    </div>');
