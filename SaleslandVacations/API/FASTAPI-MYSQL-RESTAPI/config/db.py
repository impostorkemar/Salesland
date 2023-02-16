from sqlalchemy import create_engine, MetaData

engine = create_engine("mysql+pymysql://salesland:rootsalesland@localhost:3306/salesland")
meta = MetaData()

conn = engine.connect()