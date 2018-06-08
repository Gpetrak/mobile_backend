from django.conf.urls import url
from naturall.views import naturall_home

urlpatterns = [
        url(r'^$', naturall_home, name='naturall_home'),
        # url(r'^data/', get_the_data, name = 'get_the_data'),
        ]
