package com.WayneRagsac.PassionProjectReactionTimeBackend.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.WayneRagsac.PassionProjectReactionTimeBackend.entities.ReactionTimeEntity;
import com.WayneRagsac.PassionProjectReactionTimeBackend.entities.UserEntity;
import com.WayneRagsac.PassionProjectReactionTimeBackend.enums.deviceTypeEnum;
import com.WayneRagsac.PassionProjectReactionTimeBackend.enums.genderEnum;
public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    // Find all users with a specific device type
    List<UserEntity> findByDeviceType(deviceTypeEnum deviceType);

    // Find all users in a specific year group
    List<UserEntity> findByYearGroup(Integer yearGroup);

    // You can add more custom queries, e.g., by gender or sleep hours
    List<UserEntity> findByGender(genderEnum gender);

    List<UserEntity> findBySleepHours(Integer sleepHours);
}