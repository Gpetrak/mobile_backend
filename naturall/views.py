# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse
from mobile_backend.settings import MEDIA_ROOT
from mobile_backend.settings import GEOSERVER_URL
from django.contrib.gis.geos import Point
from django.views.decorators.csrf import csrf_exempt

def naturall_home(request):
    # context = {'GEOSERVER_URL': GEOSERVER_URL}
    return render(request, 
                  'naturall/map.html',
                 # context
                 )

