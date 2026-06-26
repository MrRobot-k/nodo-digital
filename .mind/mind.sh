#!/bin/bash
# Local Mind CLI helper for landing-page project
# Usage: .mind/mind.sh <command> [args]

MIND_DIR="$(dirname "$0")"
SPACE_NAME="projects/landing-page"

case "$1" in
  init)
    echo "Mind space already initialized at $MIND_DIR"
    ;;

  memory-add)
    # Usage: .mind/mind.sh memory-add "name" "content" "tag1,tag2" ["link1,link2"]
    NAME="$2"
    CONTENT="$3"
    TAGS="$4"
    LINKS="${5:-}"
    FILE="$MIND_DIR/memories/$NAME.json"
    TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

    IFS=',' read -ra TAG_ARRAY <<< "$TAGS"
    TAG_JSON=$(printf '"%s",' "${TAG_ARRAY[@]}" | sed 's/,$//')

    LINK_JSON="[]"
    if [ -n "$LINKS" ]; then
      IFS=',' read -ra LINK_ARRAY <<< "$LINKS"
      LINK_JSON=$(printf '"%s",' "${LINK_ARRAY[@]}" | sed 's/,$//')
      LINK_JSON="[$LINK_JSON]"
    fi

    cat > "$FILE" <<EOF
{
  "space": "$SPACE_NAME",
  "name": "$NAME",
  "content": $(echo "$CONTENT" | jq -Rs .),
  "tags": [$TAG_JSON],
  "links_to": $LINK_JSON,
  "created": "$TIMESTAMP",
  "updated": "$TIMESTAMP",
  "tier": "T2"
}
EOF
    echo "Memory created: $FILE"
    ;;

  memory-list)
    ls "$MIND_DIR/memories"/*.json 2>/dev/null | xargs -I {} basename {} .json
    ;;

  memory-read)
    cat "$MIND_DIR/memories/$2.json" 2>/dev/null | jq .
    ;;

  memory-search)
    grep -r -i "$2" "$MIND_DIR/memories/" --include="*.json" | jq -r '.name' | sort -u
    ;;

  checkpoint-save)
    # Usage: .mind/mind.sh checkpoint-save "goal" "pending" "notes" ["mem1,mem2"]
    GOAL="$2"
    PENDING="$3"
    NOTES="$4"
    LINKED="${5:-}"
    NAME="checkpoint-$(date -u +"%Y%m%d-%H%M%S")"
    FILE="$MIND_DIR/checkpoints/$NAME.json"
    TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

    LINKED_JSON="[]"
    if [ -n "$LINKED" ]; then
      IFS=',' read -ra LINK_ARRAY <<< "$LINKED"
      LINKED_JSON=$(printf '"%s",' "${LINK_ARRAY[@]}" | sed 's/,$//')
      LINKED_JSON="[$LINKED_JSON]"
    fi

    cat > "$FILE" <<EOF
{
  "space": "$SPACE_NAME",
  "name": "$NAME",
  "goal": "$GOAL",
  "pending": "$PENDING",
  "notes": "$NOTES",
  "linked_memories": $LINKED_JSON,
  "created": "$TIMESTAMP",
  "updated": "$TIMESTAMP",
  "status": "active"
}
EOF
    echo "Checkpoint saved: $FILE"
    ;;

  checkpoint-list)
    ls "$MIND_DIR/checkpoints"/*.json 2>/dev/null | xargs -I {} basename {} .json
    ;;

  checkpoint-load)
    cat "$MIND_DIR/checkpoints/$2.json" 2>/dev/null | jq .
    ;;

  checkpoint-done)
    # Usage: .mind/mind.sh checkpoint-done "checkpoint-name" "summary"
    CP_NAME="$2"
    SUMMARY="$3"
    CP_FILE="$MIND_DIR/checkpoints/$CP_NAME.json"
    SESSION_FILE="$MIND_DIR/memories/session-$(date -u +"%Y%m%d-%H%M%S").json"
    TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

    if [ ! -f "$CP_FILE" ]; then
      echo "Checkpoint not found: $CP_FILE"
      exit 1
    fi

    # Create session memory from checkpoint
    GOAL=$(jq -r '.goal' "$CP_FILE")
    PENDING=$(jq -r '.pending' "$CP_FILE")
    NOTES=$(jq -r '.notes' "$CP_FILE")
    LINKED=$(jq -c '.linked_memories' "$CP_FILE")

    cat > "$SESSION_FILE" <<EOF
{
  "space": "$SPACE_NAME",
  "name": "session-$(date -u +"%Y%m%d-%H%M%S")",
  "content": "**Session Summary**: $SUMMARY\n\n**Goal**: $GOAL\n**Pending**: $PENDING\n**Notes**: $NOTES",
  "tags": ["cat:session"],
  "links_to": $LINKED,
  "created": "$TIMESTAMP",
  "updated": "$TIMESTAMP",
  "tier": "T2"
}
EOF

    # Mark checkpoint as done
    jq --arg status "completed" --arg updated "$TIMESTAMP" '.status = $status | .updated = $updated' "$CP_FILE" > "$CP_FILE.tmp" && mv "$CP_FILE.tmp" "$CP_FILE"

    echo "Session memory created: $SESSION_FILE"
    echo "Checkpoint marked complete: $CP_FILE"
    ;;

  link-create)
    # Usage: .mind/mind.sh link-create "source" "target" "label"
    SOURCE="$2"
    TARGET="$3"
    LABEL="$4"
    TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

    LINK="{\"source\":\"$SOURCE\",\"target\":\"$target\",\"label\":\"$LABEL\",\"created\":\"$TIMESTAMP\"}"
    jq --argjson link "$LINK" '. += [$link]' "$MIND_DIR/links.json" > "$MIND_DIR/links.json.tmp" && mv "$MIND_DIR/links.json.tmp" "$MIND_DIR/links.json"
    echo "Link created: $SOURCE --$LABEL--> $TARGET"
    ;;

  status)
    echo "=== Mind Status ==="
    echo "Space: $SPACE_NAME"
    echo "Memories: $(ls "$MIND_DIR/memories"/*.json 2>/dev/null | wc -l)"
    echo "Checkpoints: $(ls "$MIND_DIR/checkpoints"/*.json 2>/dev/null | wc -l)"
    echo "Links: $(jq 'length' "$MIND_DIR/links.json")"
    ;;

  *)
    echo "Usage: $0 {init|memory-add|memory-list|memory-read|memory-search|checkpoint-save|checkpoint-list|checkpoint-load|checkpoint-done|link-create|status}"
    exit 1
    ;;
esac