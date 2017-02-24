# SCRUM
from rest_framework import serializers
from ciniscrum.models import ScrumBoard, ScrumList, ScrumCard, ScrumMember, ScrumLabel, ScrumSettings




class ScrumBoardSerializer(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    title = serializers.CharField(max_length=100)
    settings = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ScrumBoard
        fields = ('id', 'title', 'settings')