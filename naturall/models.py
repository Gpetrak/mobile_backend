# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.gis.db import models
from datetime import datetime

class Gps_points(models.Model):
    location = models.PointField()
    temprature = models.FloatField(default=20)
    date = models.DateTimeField(default=datetime.now, blank=True)
