package com.insider.login.leave.repository;

import com.insider.login.leave.entity.LeaveMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveMemberRepository extends JpaRepository<LeaveMember, Integer> {

    List<LeaveMember> findAll();

    @Query("SELECT m.name FROM LeaveMember m WHERE m.memberId = :memberId")
    String findNameByMemberId(@Param("memberId") int memberId);

    @Query("SELECT m FROM LeaveMember m WHERE m.name LIKE %:name%")
    List<LeaveMember> findByName(@Param("name") String name);

    @Query("SELECT m.departNo FROM LeaveMember m WHERE m.memberId = :memberId")
    int findDepartNoByMemberId(@Param("memberId") int memberId);

    @Query("SELECT m.positionLevel FROM LeaveMember m WHERE m.memberId = :memberId")
    String findPositionLevelByMemberId(@Param("memberId") int memberId);
}