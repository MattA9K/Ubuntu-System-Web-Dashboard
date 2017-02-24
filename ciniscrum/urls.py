from django.conf.urls import url
from ciniscrum import views


urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/$', views.ScrumBoardDetail.as_view()),
]
