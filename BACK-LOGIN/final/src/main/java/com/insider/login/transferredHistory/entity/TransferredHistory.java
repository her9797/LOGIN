package com.insider.login.transferredHistory.entity;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "transferred_history")
public class TransferredHistory {

    @Id
    @Column(name = "transferred_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO INCREMENT
    private int transferredNo;                          // 식별자 번호
    @Column(name = "new_depart_no", nullable = true)
    private int newDepartNo;
    @Column(name = "new_position_name", nullable = true)
    private String newPositionName;
    @Column(name = "transferred_date", nullable = false)
    private LocalDate transferredDate;
    @Column(name = "member_id", nullable = false)
    private int memberId;

    protected TransferredHistory() {
    }

    public TransferredHistory(int transferredNo, int newDepartNo, String newPositionName, LocalDate transferredDate) {
        this.transferredNo = transferredNo;
        this.newDepartNo = newDepartNo;
        this.newPositionName = newPositionName;
        this.transferredDate = transferredDate;
    }

    public int getTransferredNo() {
        return transferredNo;
    }

    public int getNewDepartNo() {
        return newDepartNo;
    }

    public String getNewPositionName() {
        return newPositionName;
    }

    public LocalDate getTransferredDate() {
        return transferredDate;
    }

    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public void setTransferredDate(LocalDate transferredDate) {
        this.transferredDate = transferredDate;
    }

    @Override
    public String toString() {
        return "TransferredHistory{" +
                "transferredNo=" + transferredNo +
                ", newDepartNo=" + newDepartNo +
                ", newPositionName='" + newPositionName + '\'' +
                ", transferredDate=" + transferredDate +
                ", memberId=" + memberId +
                '}';
    }
}
