# MAIN
from django.conf.urls import url, include
from django.contrib import admin
from cinicraft_home import views
from cinicraft_home import models
from rest_framework import routers


# Django REST URLs:
router = routers.DefaultRouter()
#router.register(r'snippets', views.UserViewSet)


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
    url(r'^main/', include('cinicraft_home.urls')),
]



