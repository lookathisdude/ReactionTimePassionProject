package com.WayneRagsac.PassionProjectReactionTimeBackend.resolvers;

import java.util.List;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.WayneRagsac.PassionProjectReactionTimeBackend.entities.UserEntity;
import com.WayneRagsac.PassionProjectReactionTimeBackend.enums.deviceTypeEnum;
import com.WayneRagsac.PassionProjectReactionTimeBackend.enums.genderEnum;
import com.WayneRagsac.PassionProjectReactionTimeBackend.services.UserService;

import lombok.AllArgsConstructor;

/**
 * GraphQL resolver for User-related queries.
 * Handles fetching users based on device type, year group, gender, or sleep hours.
 */
@Controller
@AllArgsConstructor
public class UserResolver {

    private final UserService userService;

    // ---------------- Queries ---------------- //

    /**
     * Find all users by their device type.
     */
    @QueryMapping
    public List<UserEntity> findByDeviceType(@Argument deviceTypeEnum deviceType) {
        return userService.findByDeviceType(deviceType);
    }

    /**
     * Find all users by their year group.
     */
    @QueryMapping
    public List<UserEntity> findByYearGroup(@Argument Integer yearGroup) {
        return userService.findByYearGroup(yearGroup);
    }

    /**
     * Find all users by gender.
     */
    @QueryMapping
    public List<UserEntity> findByGender(@Argument genderEnum gender) {
        return userService.findByGender(gender);
    }

    /**
     * Find all users by sleep hours.
     */
    @QueryMapping
    public List<UserEntity> findBySleepHours(@Argument Integer sleepHours) {
        return userService.findBySleepHours(sleepHours);
    }

    //mutation mapping
    @MutationMapping
    public UserEntity addUser(
            @Argument Integer yearGroup,
            @Argument Integer sleepHours,
            @Argument deviceTypeEnum deviceType,
            @Argument genderEnum gender
    ) {
        return userService.addUser(yearGroup, sleepHours, deviceType, gender.name());
    }
}