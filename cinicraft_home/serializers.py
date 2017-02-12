from rest_framework import serializers
from django.contrib.auth.models import User, Group
from cinicraft_home import models




# DJANGO MODEL SERIALIZERS:
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')




