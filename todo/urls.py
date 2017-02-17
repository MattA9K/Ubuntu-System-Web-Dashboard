# TODO_APP

from django.conf.urls import url
from todo import views


urlpatterns = [
    url(r'^todolist/$', views.ToDoList.as_view(), name='todo_list'),
]