package com.WayneRagsac.PassionProjectReactionTimeBackend.services.interfaces;

import java.util.List;

import com.WayneRagsac.PassionProjectReactionTimeBackend.entities.UserEntity;
import com.WayneRagsac.PassionProjectReactionTimeBackend.enums.deviceTypeEnum;
import com.WayneRagsac.PassionProjectReactionTimeBackend.enums.genderEnum;

// Service interface for user-related operations
public interface UserServiceInterface {

    // Get all users by device type
    List<UserEntity> findByDeviceType(deviceTypeEnum deviceType);

    // Optional: Get all users in a specific year group
    List<UserEntity> findByYearGroup(Integer yearGroup);

    // Optional: Get all users by gender
    List<UserEntity> findByGender(genderEnum gender);

    // Optional: Get all users by sleep hours
    List<UserEntity> findBySleepHours(Integer sleepHours);

    UserEntity addUser(Integer yearGroup, Integer sleepHours, deviceTypeEnum deviceType, String gender);

}