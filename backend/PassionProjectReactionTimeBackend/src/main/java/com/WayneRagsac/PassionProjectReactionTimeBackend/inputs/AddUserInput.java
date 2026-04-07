package com.WayneRagsac.PassionProjectReactionTimeBackend.inputs;

import com.WayneRagsac.PassionProjectReactionTimeBackend.enums.deviceTypeEnum;
import com.WayneRagsac.PassionProjectReactionTimeBackend.enums.genderEnum;

public record AddUserInput(
    Integer yearGroup,
    Integer sleepHours,
    deviceTypeEnum deviceType,
    genderEnum gender
) {}