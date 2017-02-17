# AUTHOR
from django.conf.urls import url
from author import views


urlpatterns = [
    url(r'^authors/$', views.AuthorList.as_view(), name='authors_list'),
]
