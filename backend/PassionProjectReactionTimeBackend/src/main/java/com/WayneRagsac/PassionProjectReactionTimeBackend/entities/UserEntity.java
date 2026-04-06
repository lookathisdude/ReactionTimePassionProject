package com.WayneRagsac.PassionProjectReactionTimeBackend.entities;

import java.time.OffsetDateTime;
import java.util.UUID;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import com.WayneRagsac.PassionProjectReactionTimeBackend.enums.deviceTypeEnum;
import com.WayneRagsac.PassionProjectReactionTimeBackend.enums.genderEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    // Proper UUID generator
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(updatable = false, nullable = false)
    private UUID id;

    private Integer yearGroup;

    private Integer sleepHours;

    @Enumerated(EnumType.STRING)
    private deviceTypeEnum deviceType;

    @Enumerated(EnumType.STRING)
    private genderEnum gender;

    private OffsetDateTime timestamp = OffsetDateTime.now();
}