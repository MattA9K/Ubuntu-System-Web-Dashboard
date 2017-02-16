# FORUM
from django.conf.urls import url
from forum import views


urlpatterns = [
    url(r'^threads/$', views.ThreadsList.as_view(), name='threads'),
    url(r'^threads/(?P<pk>[0-9]+)/$', views.ThreadsList.as_view(), name='thread'),
]

