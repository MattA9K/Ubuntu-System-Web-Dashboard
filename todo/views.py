# TODO_APP
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

from todo.models import ToDoTag, ToDoItem
from todo.serializers import ToDoItemSerializer, ToDoTagSerializer


"""
class UserDetail(generics.RetrieveAPIView):

    A view that returns a templated HTML representation of a given user.

    queryset = User.objects.all()
    renderer_classes = (TemplateHTMLRenderer,)

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        return Response({'user': self.object}, template_name='user_detail.html')
"""


# Create your views here.
class ToDoList(generics.ListAPIView):
    queryset = ToDoItem.objects.all()
    serializer_class = ToDoItemSerializer