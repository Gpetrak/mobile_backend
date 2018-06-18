# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.gis.db import models

class Accidents(models.Model):
    name = models.CharField(max_length=254, blank=True, null=True)
    geom = models.MultiPolygonField(srid=2100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'accidents'
