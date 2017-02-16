# FORUM
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from forum.models import Thread
from forum.serializers import ThreadSerializer


# Create your views here.
class ThreadsList(APIView):
    def get(self, request, format=None):
        threads = Thread.objects.all()
        serializer = ThreadSerializer(threads, many=True)
        return Response(serializer.data)