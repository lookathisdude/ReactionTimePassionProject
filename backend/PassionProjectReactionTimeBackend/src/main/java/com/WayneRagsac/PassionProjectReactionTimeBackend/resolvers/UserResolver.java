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

@Controller
@AllArgsConstructor
public class UserResolver {

    private final UserService userService;

    record AddUserInput(
        Integer yearGroup,
        Integer sleepHours,
        deviceTypeEnum deviceType,
        genderEnum gender
    ) {}

    // ---------------- Queries ---------------- //

    @QueryMapping
    public List<UserEntity> findByDeviceType(@Argument("deviceType") deviceTypeEnum deviceType) {
        return userService.findByDeviceType(deviceType);
    }

    @QueryMapping
    public List<UserEntity> findByYearGroup(@Argument("yearGroup") Integer yearGroup) {
        return userService.findByYearGroup(yearGroup);
    }

    @QueryMapping
    public List<UserEntity> findByGender(@Argument("gender") genderEnum gender) {
        return userService.findByGender(gender);
    }

    @QueryMapping
    public List<UserEntity> findBySleepHours(@Argument("sleepHours") Integer sleepHours) {
        return userService.findBySleepHours(sleepHours);
    }

    // ---------------- Mutations ---------------- //

    @MutationMapping
    public UserEntity addUser(@Argument("input") AddUserInput input) {
        return userService.addUser(
            input.yearGroup(),
            input.sleepHours(),
            input.deviceType(),
            input.gender().name()
        );
    }
}