package com.WayneRagsac.PassionProjectReactionTimeBackend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.WayneRagsac.PassionProjectReactionTimeBackend.entities.UserEntity;
import com.WayneRagsac.PassionProjectReactionTimeBackend.enums.deviceTypeEnum;
import com.WayneRagsac.PassionProjectReactionTimeBackend.enums.genderEnum;
import com.WayneRagsac.PassionProjectReactionTimeBackend.repository.UserRepository;
import com.WayneRagsac.PassionProjectReactionTimeBackend.services.interfaces.UserServiceInterface;

import lombok.RequiredArgsConstructor;

@Service // Marks this as a Spring service
@RequiredArgsConstructor // Automatically generates constructor for final fields
public class UserService implements UserServiceInterface {


    private final UserRepository userRepository; // Injected repository


    // ===============================
    // Find users by device type
    // ===============================
    @Override
    public List<UserEntity> findByDeviceType(deviceTypeEnum deviceType) {
        if (deviceType == null) {
            throw new IllegalArgumentException("Device type must not be null");
        }
        return userRepository.findByDeviceType(deviceType);
    }

    // ===============================
    // Find users by year group
    // ===============================
    @Override
    public List<UserEntity> findByYearGroup(Integer yearGroup) {
        if (yearGroup == null) {
            throw new IllegalArgumentException("Year group must not be null");
        }
        return userRepository.findByYearGroup(yearGroup);
    }

    // ===============================
    // Find users by gender
    // ===============================
    @Override
    public List<UserEntity> findByGender(genderEnum gender) {
        if (gender == null) {
            throw new IllegalArgumentException("Gender must not be null or empty");
        }
        return userRepository.findByGender(gender);
    }

    // ===============================
    // Find users by sleep hours
    // ===============================
    @Override
    public List<UserEntity> findBySleepHours(Integer sleepHours) {
        if (sleepHours == null || sleepHours < 0) {
            throw new IllegalArgumentException("Sleep hours must be a positive integer");
        }
        return userRepository.findBySleepHours(sleepHours);
    }

    @Override
    public UserEntity addUser(Integer yearGroup, Integer sleepHours, deviceTypeEnum deviceType, String gender) {
            //check, if fields are null
            if(yearGroup == null || sleepHours == null || deviceType == null || gender == null || gender.isBlank()) {
                throw new IllegalArgumentException("All fields must not be null or empty");
            }
            if(sleepHours < 0) {
                throw new IllegalArgumentException("Sleep hours must be a positive integer");
            }
            UserEntity user = new UserEntity();
            user.setYearGroup(yearGroup);
            user.setSleepHours(sleepHours);
            user.setDeviceType(deviceType);
            user.setGender(genderEnum.valueOf(gender.toUpperCase()));
            return userRepository.save(user);
    }

}