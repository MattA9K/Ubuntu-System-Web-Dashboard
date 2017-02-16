# FORUM
from rest_framework import serializers
from forum.models import Category, Post, Thread, Reply


class CategorySerializer(serializers.Serializer):
    name = serializers.CharField()

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    class Meta:
        model = Category
        fields = ('name')


class ThreadSerializer(serializers.Serializer):
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    author_id = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    category = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    body = serializers.CharField(required=False, allow_blank=True, max_length=100)
    pub_date = serializers.DateTimeField()
    likes = serializers.IntegerField()

    class Meta:
        model = Thread
        fields = ('title','author_id','category','body','pub_date','likes')


class ReplySerializer(serializers.Serializer):
    post = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    category = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    body = serializers.CharField(required=False, allow_blank=True, max_length=100)
    pub_date = serializers.DateTimeField()
    likes = serializers.IntegerField()

    class Meta:
        model = Thread
        fields = ('post','author_id','category','body','pub_date','likes')