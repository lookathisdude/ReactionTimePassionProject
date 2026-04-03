package com.WayneRagsac.PassionProjectReactionTimeBackend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReactionTimeEntity {

    // UUID generator for id
    @Id
    @GeneratedValue(generator = "UUID")
    @Column(updatable = false, nullable = false)
    private UUID id;

    private String userId; // userId is a string that can be used to identify the user.

    private long reactionTime; // in milliseconds

    private LocalDateTime timestamp = LocalDateTime.now();
}