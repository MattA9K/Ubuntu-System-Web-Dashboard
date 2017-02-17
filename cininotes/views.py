from django.shortcuts import render
from cininotes.models import Note, ChecklistItem
from cininotes.serializers import NoteSerializer, ChecklistItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics


# Create your views here.
class NoteList(APIView):
    def get(self, request, format=None):
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)