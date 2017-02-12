from django.shortcuts import render

from django.http import HttpResponse
from django.template import loader

from django.contrib.auth.models import User, Group

from rest_framework import viewsets, generics
from cinicraft_home.serializers import GroupSerializer
from snippets.serializers import UserSerializer
# Create your views here.


def index(request):
    template = loader.get_template('index.html')
    context = {
        "message": "Welcome to CiniCrafts official website!",
    }
    return HttpResponse(template.render(context, request))


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

