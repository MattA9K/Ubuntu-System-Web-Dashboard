# MAIN
from django.conf.urls import url, include
from django.contrib import admin
from cinicraft_home import views
from cinicraft_home import models
from cinicraft_home.views import *
from rest_framework import routers


# Django REST URLs:
router = routers.DefaultRouter()
#router.register(r'snippets', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)


# Django URLs:
urlpatterns = [

    # REST DOCUMENTATION:
    url(r'^docs/', include('rest_framework_docs.urls')),

    # Django
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index),

    # Django-REST
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/', include(router.urls)),

    # Snippets:
    url(r'^snippets/', include('snippets.urls')),
    url(r'^forum/', include('forum.urls')),
    url(r'^author/', include('author.urls')),
    url(r'^todo/', include('todo.urls')),
    url(r'^notes/', include('cininotes.urls')),
    url(r'^scrum/', include('ciniscrum.urls')),

    #url(r'^users/$', views.UserList.as_view(), name='users'),
    #url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
]



