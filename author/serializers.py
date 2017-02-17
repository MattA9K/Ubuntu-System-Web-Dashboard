# AUTHOR
from rest_framework import serializers
from author.models import AuthorUser


class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=100)



class AuthorSerializer(serializers.Serializer):
    auth_user_id = UserSerializer()
    date_registered = serializers.DateTimeField()

    class Meta:
        model = AuthorUser
        fields = ('auth_user_id', 'date_registered')


