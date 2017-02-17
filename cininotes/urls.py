# NOTES

from django.conf.urls import url
from cininotes import views


urlpatterns = [
    url(r'^list/$', views.NoteList.as_view(), name='notes_list'),
]

