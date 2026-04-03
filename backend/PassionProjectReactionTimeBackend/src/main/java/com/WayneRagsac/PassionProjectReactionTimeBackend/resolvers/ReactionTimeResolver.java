package com.WayneRagsac.PassionProjectReactionTimeBackend.resolvers;

import java.util.List;
import java.util.UUID;

import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.WayneRagsac.PassionProjectReactionTimeBackend.entities.ReactionTimeEntity;
import com.WayneRagsac.PassionProjectReactionTimeBackend.services.ReactionTimeService;

@Controller
public class ReactionTimeResolver {

    // initialise the service
    private final ReactionTimeService reactionTimeService;

    public ReactionTimeResolver(ReactionTimeService reactionTimeService) {
        this.reactionTimeService = reactionTimeService;
    }

    // Queries
    @QueryMapping
    public List<ReactionTimeEntity> getAllReactionTimes() {
        return reactionTimeService.getAllReactionTimes();
    }

    @QueryMapping
    public List<ReactionTimeEntity> getReactionTimesByUser(String userId) {
        return reactionTimeService.getReactionTimesByUser(userId);
    }

    @QueryMapping
    public ReactionTimeEntity getReactionTimeById(String id) {
        try {
            return reactionTimeService.getReactionTimeById(UUID.fromString(id));
        } catch (IllegalArgumentException e) {
            System.err.println("Invalid UUID format: " + id);
            return null;
        }
    }

    @MutationMapping
    public ReactionTimeEntity addReactionTime(String userId, long reactionTime) {
        return reactionTimeService.addReactionTime(userId, reactionTime);
    }

}
