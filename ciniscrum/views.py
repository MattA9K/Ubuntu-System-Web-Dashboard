from django.shortcuts import render
from rest_framework.views import APIView
from ciniscrum.models import ScrumBoard, ScrumList, ScrumCard, ScrumMember, ScrumLabel, ScrumSettings
from ciniscrum.serializers import ScrumBoardSerializer
from rest_framework.response import Response


class ScrumBoardDetail(APIView):

    def get_object(self, pk):
        try:
            return ScrumBoard.objects.get(pk=pk)
        except ScrumBoard.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        board = ScrumBoard.objects.get_object(pk)
        serializer = ScrumBoardSerializer(board)
        return Response(serializer.data)
