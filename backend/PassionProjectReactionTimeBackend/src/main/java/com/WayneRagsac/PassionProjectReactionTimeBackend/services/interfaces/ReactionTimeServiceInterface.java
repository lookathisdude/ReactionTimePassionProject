package com.WayneRagsac.PassionProjectReactionTimeBackend.services.interfaces;

import com.WayneRagsac.PassionProjectReactionTimeBackend.entities.ReactionTimeEntity;

import java.util.List;
import java.util.UUID;

public interface ReactionTimeServiceInterface {
    List<ReactionTimeEntity> getAllReactionTimes();

    List<ReactionTimeEntity> getReactionTimesByUser(String userId);

    ReactionTimeEntity addReactionTime(String userId, long reactionTime);

    ReactionTimeEntity getReactionTimeById(UUID id); 
}