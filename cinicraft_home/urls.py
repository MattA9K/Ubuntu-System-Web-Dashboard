from django.conf.urls import url
from cinicraft_home import views


urlpatterns = [
    url(r'^ram/$', views.getRam.as_view(), name='ram'),
    url(r'^processes/$', views.getProcesses.as_view(), name='processes'),
    url(r'^storage/$', views.getStorage.as_view(), name='processes'),
    url(r'^cpuinfo/$', views.getCPUInfo.as_view(), name='processes'),
    url(r'^uptime/$', views.getUpTime.as_view(), name='processes'),
# getProcesses
]

