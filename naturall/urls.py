from django.conf.urls import url
from naturall.views import naturall_home, datastore, send_data

urlpatterns = [
        url(r'^$', naturall_home, name='naturall_home'),
        url(r'^result/', datastore, name = 'datastore'),
        url(r'^data/', send_data, name='send_data'),
        ]
