package com.WayneRagsac.PassionProjectReactionTimeBackend.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.WayneRagsac.PassionProjectReactionTimeBackend.entities.ReactionTimeEntity;

@Repository
public interface ReactionTimeRepository extends JpaRepository<ReactionTimeEntity, UUID> {
    List<ReactionTimeEntity> reactionTimes = new ArrayList<>();

    List<ReactionTimeEntity> findByUserId(String userId);
}
