from django.conf.urls import url
from naturall.views import naturall_home

urlpatterns = [
        url(r'^$', naturall_home, name='naturall_home'),
        url(r'^result/', datastore, name = 'datastore'),
        ]
