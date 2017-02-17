# AUTHOR
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from author.models import AuthorUser
from author.serializers import AuthorSerializer

# Create your views here.
class AuthorList(APIView):

    def get(self, request, format=None):
        authors = AuthorUser.objects.all()
        serializer = AuthorSerializer(authors, many=True)
        return Response(serializer.data)