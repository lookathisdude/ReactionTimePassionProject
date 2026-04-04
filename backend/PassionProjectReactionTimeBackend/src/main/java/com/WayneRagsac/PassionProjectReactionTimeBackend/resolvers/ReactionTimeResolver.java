package com.WayneRagsac.PassionProjectReactionTimeBackend.resolvers;

import java.util.List;
import java.util.UUID;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.WayneRagsac.PassionProjectReactionTimeBackend.entities.ReactionTimeEntity;
import com.WayneRagsac.PassionProjectReactionTimeBackend.services.ReactionTimeService;

@Controller
public class ReactionTimeResolver {

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
    public List<ReactionTimeEntity> getReactionTimesByUser(@Argument String userId) {
        return reactionTimeService.getReactionTimesByUser(userId);
    }

    @QueryMapping
    public ReactionTimeEntity getReactionTimeById(@Argument String id) {
        try {
            return reactionTimeService.getReactionTimeById(UUID.fromString(id));
        } catch (IllegalArgumentException e) {
            System.err.println("Invalid UUID format: " + id);
            return null;
        }
    }

    // Mutation: accept reaction time as integer
    @MutationMapping
    public ReactionTimeEntity addReactionTime(@Argument String userId, @Argument int reactionTime) {
        return reactionTimeService.addReactionTime(userId, reactionTime);
    }
}