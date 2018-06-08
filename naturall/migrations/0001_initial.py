# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-04-26 13:48
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CoastLineCretePoly',
            fields=[
                ('gid', models.AutoField(primary_key=True, serialize=False)),
                ('sde_emeric', models.CharField(blank=True, max_length=254, null=True)),
                ('layer', models.CharField(blank=True, max_length=254, null=True)),
                ('elevation', models.DecimalField(blank=True, decimal_places=65535, max_digits=65535, null=True)),
                ('thickness', models.DecimalField(blank=True, decimal_places=65535, max_digits=65535, null=True)),
                ('color', models.DecimalField(blank=True, decimal_places=65535, max_digits=65535, null=True)),
                ('st_length_field', models.DecimalField(blank=True, db_column='st_length_', decimal_places=65535, max_digits=65535, null=True)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(blank=True, null=True, srid=2100)),
            ],
            options={
                'db_table': 'coast_line_crete_poly',
                'managed': False,
            },
        ),
    ]
